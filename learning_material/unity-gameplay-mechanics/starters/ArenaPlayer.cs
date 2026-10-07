using System.Collections;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class ArenaPlayer : MonoBehaviour
{
    [SerializeField] private ArenaOrbit focalPoint;
    [SerializeField] private GameObject powerupIndicator;
    [SerializeField] private float moveForce = 10f;
    [SerializeField] private float fallLimit = -10f;
    private Rigidbody body;
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
    }

    private void Update()
    {
        if (!GameOver && transform.position.y < fallLimit)
        {
            GameOver = true;
            Debug.Log("Player fell. Stop and restart Play mode to retry.", this);
        }
    }

    private void FixedUpdate()
    {
        // Add movement in step 2.1.
    }

    private void LateUpdate()
    {
        powerupIndicator.transform.position =
            transform.position + new Vector3(0f, -0.65f, 0f);
    }





}
