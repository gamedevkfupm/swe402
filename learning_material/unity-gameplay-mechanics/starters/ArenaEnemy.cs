using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class ArenaEnemy : MonoBehaviour
{
    [SerializeField] private float chaseForce = 3f;
    [SerializeField] private float fallLimit = -10f;
    private Rigidbody body;
    private ArenaPlayer player;

    private void Awake() => body = GetComponent<Rigidbody>();

    private void Start()
    {
        player = FindFirstObjectByType<ArenaPlayer>();
        if (player == null)
        {
            Debug.LogError("The scene needs one active ArenaPlayer.", this);
            enabled = false;
        }
    }

    private void FixedUpdate()
    {
        // Add pursuit in step 3.1.
    }

    private void Update()
    {
        if (transform.position.y < fallLimit) Destroy(gameObject);
    }
}
