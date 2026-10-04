using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(Rigidbody), typeof(Animator), typeof(AudioSource))]
public class RunnerController : MonoBehaviour
{
    // Input setup is supplied. Write the lesson behavior below.
    [SerializeField] private InputAction jumpAction =
        new InputAction("Jump", InputActionType.Button, "<Keyboard>/space");

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
    }

    private void Update()
    {
    }

    private void FixedUpdate()
    {
    }

    private void OnCollisionEnter(Collision collision)
    {
    }
}
