using UnityEngine;
using UnityEngine.InputSystem;

public class ArenaOrbit : MonoBehaviour
{
    [SerializeField] private float rotationSpeed = 90f;
    private InputAction move;
    public Vector2 MoveInput { get; private set; }

    private void Awake()
    {
        move = new InputAction("Move", InputActionType.Value);
        move.AddCompositeBinding("2DVector")
            .With("Up", "<Keyboard>/w")
            .With("Down", "<Keyboard>/s")
            .With("Left", "<Keyboard>/a")
            .With("Right", "<Keyboard>/d");
        move.AddCompositeBinding("2DVector")
            .With("Up", "<Keyboard>/upArrow")
            .With("Down", "<Keyboard>/downArrow")
            .With("Left", "<Keyboard>/leftArrow")
            .With("Right", "<Keyboard>/rightArrow");
    }

    private void OnEnable() => move.Enable();

    private void OnDisable()
    {
        move.Disable();
        MoveInput = Vector2.zero;
    }

    private void OnDestroy() => move.Dispose();

    private void Update()
    {
        MoveInput = move.ReadValue<Vector2>();
        transform.Rotate(Vector3.up,
            MoveInput.x * rotationSpeed * Time.deltaTime);
    }
}
