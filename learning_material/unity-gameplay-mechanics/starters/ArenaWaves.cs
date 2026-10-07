using UnityEngine;

public class ArenaWaves : MonoBehaviour
{
    [SerializeField] private ArenaPlayer player;
    [SerializeField] private ArenaEnemy enemyPrefab;
    [SerializeField] private GameObject powerupPrefab;
    [SerializeField] private float spawnRange = 5f;
    [SerializeField] private float spawnHeight = 2f;

    private void Start()
    {
        // Write wave behavior in step 5.1.
    }

    private void Update()
    {
        // Write wave behavior in step 5.1.
    }

    private Vector3 GenerateSpawnPosition()
    {
        return new Vector3(Random.Range(-spawnRange, spawnRange),
            spawnHeight, Random.Range(-spawnRange, spawnRange));
    }

    private void SpawnWave(int enemiesToSpawn)
    {
        // Write wave behavior in step 5.1.
    }
}
