using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerFeeder : MonoBehaviour
{
    [SerializeField] private InputAction moveAction;
    [SerializeField] private InputAction fireAction;
    [SerializeField] private GameObject foodPrefab;
    [SerializeField] private float speed = 10f;
    [SerializeField] private float xLimit = 10f;

    private void OnEnable()
    {
        moveAction.Enable();
        fireAction.Enable();
    }

    private void OnDisable()
    {
        moveAction.Disable();
        fireAction.Disable();
    }

    private void Update()
    {
        float horizontal = moveAction.ReadValue<Vector2>().x;
        Vector3 position = transform.position;
        position.x += horizontal * speed * Time.deltaTime;
        if (position.x < -xLimit) position.x = -xLimit;
        if (position.x > xLimit) position.x = xLimit;
        transform.position = position;

        if (fireAction.WasPressedThisFrame() && foodPrefab != null)
        {
            Vector3 launchPosition = position + new Vector3(0f, 1f, 1.5f);
            Instantiate(foodPrefab, launchPosition, foodPrefab.transform.rotation);
        }
    }
}
