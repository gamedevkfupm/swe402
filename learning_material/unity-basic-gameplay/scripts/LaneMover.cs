using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class LaneMover : MonoBehaviour
{
    [SerializeField] private float speed = 8f;
    private Rigidbody body;

    private void Awake()
    {
        body = GetComponent<Rigidbody>();
    }

    private void FixedUpdate()
    {
        Vector3 step = transform.forward * speed * Time.fixedDeltaTime;
        body.MovePosition(body.position + step);
    }
}
