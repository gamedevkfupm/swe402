using System.Collections;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class ArenaPlayer : MonoBehaviour
{
    [SerializeField] private ArenaOrbit focalPoint;
    [SerializeField] private GameObject powerupIndicator;
    [SerializeField] private float moveForce = 10f;
    [SerializeField] private float powerupStrength = 15f;
    [SerializeField] private float powerupDuration = 7f;
    [SerializeField] private float fallLimit = -10f;
    [SerializeField] private bool hasPowerup;
    private Rigidbody body;
    private Coroutine countdown;
    public bool GameOver { get; private set; }

    private void Awake()
    {
        body = GetComponent<Rigidbody>();
        if (focalPoint == null || powerupIndicator == null)
        {
            Debug.LogError("Assign Focal Point and Powerup Indicator on Player.", this);
            enabled = false;
            return;
        }
        powerupIndicator.SetActive(false);
        hasPowerup = false;
    }

    private void Update()
    {
        if (!GameOver && transform.position.y < fallLimit)
        {
            GameOver = true;
            ClearPowerup();
            Debug.Log("Player fell. Stop and restart Play mode to retry.", this);
        }
    }

    private void FixedUpdate()
    {
        if (GameOver) return;
        body.AddForce(focalPoint.transform.forward *
            focalPoint.MoveInput.y * moveForce);
    }

    private void LateUpdate()
    {
        powerupIndicator.transform.position =
            transform.position + new Vector3(0f, -0.65f, 0f);
    }

    private void OnTriggerEnter(Collider other)
    {
        if (GameOver || !other.CompareTag("Powerup")) return;
        other.enabled = false;
        Destroy(other.gameObject);
        if (countdown != null) StopCoroutine(countdown);
        hasPowerup = true;
        powerupIndicator.SetActive(true);
        countdown = StartCoroutine(PowerupCountdown());
    }

    private IEnumerator PowerupCountdown()
    {
        yield return new WaitForSeconds(powerupDuration);
        hasPowerup = false;
        powerupIndicator.SetActive(false);
        countdown = null;
    }

    private void OnCollisionEnter(Collision collision)
    {
        if (GameOver || !hasPowerup ||
            !collision.gameObject.CompareTag("Enemy")) return;
        Rigidbody enemyBody = collision.rigidbody;
        if (enemyBody == null) return;
        Vector3 away = enemyBody.position - body.position;
        away.y = 0f;
        enemyBody.AddForce(away.normalized * powerupStrength,
            ForceMode.Impulse);
    }

    private void ClearPowerup()
    {
        if (countdown != null) StopCoroutine(countdown);
        countdown = null;
        hasPowerup = false;
        if (powerupIndicator != null) powerupIndicator.SetActive(false);
    }

    private void OnDisable() => ClearPowerup();
}
