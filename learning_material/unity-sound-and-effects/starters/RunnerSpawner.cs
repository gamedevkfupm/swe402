using UnityEngine;

public class RunnerSpawner : MonoBehaviour
{
    [SerializeField] private RunnerController runner;
    [SerializeField] private RunnerObstacle obstaclePrefab;
    [SerializeField] private float interval = 3f;

    private void OnEnable() => InvokeRepeating(nameof(Spawn), 2f, interval);
    private void OnDisable() => CancelInvoke(nameof(Spawn));

    private void Spawn()
    {
        if (runner == null || obstaclePrefab == null) return;
        RunnerObstacle obstacle = Instantiate(obstaclePrefab, transform.position,
            obstaclePrefab.transform.rotation);
        obstacle.Initialize(runner);
    }
}
