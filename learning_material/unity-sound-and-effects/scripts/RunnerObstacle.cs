using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class RunnerObstacle : MonoBehaviour
{
    [SerializeField] private float speed = 6f;
    private RunnerController runner;
    private Rigidbody body;

    private void Awake() => body = GetComponent<Rigidbody>();

    public void Initialize(RunnerController player) => runner = player;

    private void FixedUpdate()
    {
        if (runner == null || runner.GameOver) return;
        body.MovePosition(body.position + Vector3.left * speed * Time.fixedDeltaTime);
        if (body.position.x < -8f) Destroy(gameObject);
    }
}
