using UnityEngine;

public class ArenaWaves : MonoBehaviour
{
    [SerializeField] private ArenaPlayer player;
    [SerializeField] private ArenaEnemy enemyPrefab;
    [SerializeField] private GameObject powerupPrefab;
    [SerializeField] private float spawnRange = 5f;
    [SerializeField] private float spawnHeight = 2f;
    [SerializeField] private int waveNumber;
    [SerializeField] private int enemyCount;
    private GameObject currentPowerup;

    private void Start()
    {
        if (player == null || enemyPrefab == null || powerupPrefab == null)
        {
            Debug.LogError("Assign Player, Enemy Prefab and Powerup Prefab.", this);
            enabled = false;
            return;
        }
        waveNumber = 1;
        SpawnWave(waveNumber);
    }

    private void Update()
    {
        if (player.GameOver) return;
        enemyCount = FindObjectsByType<ArenaEnemy>(FindObjectsSortMode.None).Length;
        if (enemyCount == 0)
        {
            waveNumber++;
            SpawnWave(waveNumber);
        }
    }

    private Vector3 GenerateSpawnPosition()
    {
        return new Vector3(Random.Range(-spawnRange, spawnRange),
            spawnHeight, Random.Range(-spawnRange, spawnRange));
    }

    private void SpawnWave(int enemiesToSpawn)
    {
        for (int i = 0; i < enemiesToSpawn; i++)
        {
            Instantiate(enemyPrefab, GenerateSpawnPosition(), Quaternion.identity);
        }
        if (currentPowerup != null) Destroy(currentPowerup);
        Vector3 pickupPosition = GenerateSpawnPosition();
        pickupPosition.y = 0f;
        currentPowerup = Instantiate(powerupPrefab, pickupPosition, Quaternion.identity);
        enemyCount = enemiesToSpawn;
        Debug.Log($"Wave {waveNumber}: {enemyCount} enemies", this);
    }
}
