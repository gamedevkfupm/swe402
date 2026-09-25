using UnityEngine;
using UnityEngine.InputSystem;

[RequireComponent(typeof(Rigidbody))]
public class PlayerControlLab : MonoBehaviour
{
    [SerializeField] private float speed = 5f;
    [SerializeField] private float rotationSpeed = 120f;
    [SerializeField] private InputAction moveAction =
        new InputAction("Move", InputActionType.Value,
            expectedControlType: "Vector2");
    [SerializeField] private Vector2 moveInput; // Observe in Play mode.
    private Rigidbody body;

    private void Awake()
    {
        body = GetComponent<Rigidbody>();
    }

    private void OnEnable()
    {
        moveAction.Enable();
    }

    private void OnDisable()
    {
        moveAction.Disable();
        moveInput = Vector2.zero;
    }

    private void Update()
    {
        moveInput = moveAction.ReadValue<Vector2>();
    }

    private void FixedUpdate()
    {
        Vector3 movement = transform.forward * moveInput.y
            * speed * Time.fixedDeltaTime;
        body.MovePosition(body.position + movement);

        float steering = moveInput.x;
        if (moveInput.y < 0f) steering = -steering;
        float angle = steering * rotationSpeed * Time.fixedDeltaTime;
        body.MoveRotation(body.rotation * Quaternion.Euler(0f, angle, 0f));
    }
}
