using UnityEngine;
using UnityEngine.InputSystem;

public class Target : MonoBehaviour
{
    private Rigidbody targetRb;
    private float minSpeed = 12f;
    private float maxSpeed = 16f;
    private float maxTorque = 10f;
    private float xRange = 4f;
    private float ySpawnPos = -6f;

    private void Start()
    {
        targetRb = GetComponent<Rigidbody>();
        transform.position = RandomSpawnPos();
        targetRb.AddForce(RandomForce(), ForceMode.Impulse);
        targetRb.AddTorque(RandomTorque(), RandomTorque(), RandomTorque(), ForceMode.Impulse);
    }

    private Vector3 RandomForce()
    {
        return Vector3.up * Random.Range(minSpeed, maxSpeed);
    }

    private float RandomTorque()
    {
        return Random.Range(-maxTorque, maxTorque);
    }

    private Vector3 RandomSpawnPos()
    {
        return new Vector3(Random.Range(-xRange, xRange), ySpawnPos, 0f);
    }

    private void Update()
    {
        if (Mouse.current == null) return;
        if (Mouse.current.leftButton.wasPressedThisFrame)
        {
            Ray ray = Camera.main.ScreenPointToRay(Mouse.current.position.ReadValue());
    Debug.DrawRay(ray.origin, ray.direction * 100f, Color.red, 2f);
    if (Physics.Raycast(ray, out RaycastHit hit) && hit.rigidbody == targetRb)
    {
        Destroy(gameObject);
    }
        }
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("DestroyZone"))
        {
            Destroy(gameObject);
        }
    }
}
