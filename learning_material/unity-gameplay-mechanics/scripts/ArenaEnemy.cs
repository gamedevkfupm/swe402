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
        if (player == null || player.GameOver) return;
        Vector3 direction = player.transform.position - transform.position;
        direction.y = 0f;
        body.AddForce(direction.normalized * chaseForce);
    }

    private void Update()
    {
        if (transform.position.y < fallLimit) Destroy(gameObject);
    }
}
