using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(Rigidbody), typeof(Animator), typeof(AudioSource))]
public class RunnerController : MonoBehaviour
{
    [SerializeField] private InputAction jumpAction =
        new InputAction("Jump", InputActionType.Button, "<Keyboard>/space");
    [SerializeField] private float jumpImpulse = 7f;
    [SerializeField] private bool useAnimation;
    [SerializeField] private ParticleSystem dirt;
    [SerializeField] private ParticleSystem crash;
    [SerializeField] private AudioClip jumpSound;
    [SerializeField] private AudioClip crashSound;

    public bool GameOver { get; private set; }
    private bool grounded;
    private bool jumpQueued;
    private Rigidbody body;
    private Animator animator;
    private AudioSource audioSource;

    private void Awake()
    {
        body = GetComponent<Rigidbody>();
        animator = GetComponent<Animator>();
        audioSource = GetComponent<AudioSource>();
    }

    private void OnEnable() => jumpAction.Enable();
    private void OnDisable() => jumpAction.Disable();

    private void Start()
    {
        if (useAnimation) animator.SetFloat("Speed_f", 1f);
    }

    private void Update()
    {
        if (jumpAction.WasPressedThisFrame() && grounded && !GameOver)
        {
            grounded = false;
            jumpQueued = true;
        }
    }

    private void FixedUpdate()
    {
        if (!jumpQueued || GameOver) return;
        jumpQueued = false;
        body.AddForce(Vector3.up * jumpImpulse, ForceMode.Impulse);
        if (useAnimation) animator.SetTrigger("Jump_trig");
        if (dirt != null) dirt.Stop(true, ParticleSystemStopBehavior.StopEmitting);
        if (jumpSound != null) audioSource.PlayOneShot(jumpSound, 0.8f);
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (GameOver) return;

        if (collision.gameObject.CompareTag("Obstacle"))
        {
            GameOver = true;
            jumpQueued = false;
            if (useAnimation)
            {
                animator.ResetTrigger("Jump_trig");
                animator.SetInteger("DeathType_int", 1);
                animator.SetBool("Death_b", true);
            }
            if (dirt != null) dirt.Stop(true, ParticleSystemStopBehavior.StopEmitting);
            if (crash != null) crash.Play();
            if (crashSound != null) audioSource.PlayOneShot(crashSound, 1f);
            Debug.Log("Game over: feedback fired once.");
            return;
        }

        if (collision.gameObject.CompareTag("Ground"))
        {
            // Only a surface supporting the player counts as a landing.
            foreach (ContactPoint contact in collision.contacts)
            {
                if (contact.normal.y > 0.5f)
                {
                    grounded = true;
                    if (dirt != null) dirt.Play();
                    break;
                }
            }
        }
    }
}
