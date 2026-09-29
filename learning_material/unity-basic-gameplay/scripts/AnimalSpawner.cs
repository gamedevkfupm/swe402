using UnityEngine;

public class AnimalSpawner : MonoBehaviour
{
    [SerializeField] private GameObject[] animalPrefabs;
    [SerializeField] private float xRange = 10f;
    [SerializeField] private float spawnZ = 18f;
    [SerializeField] private float firstDelay = 2f;
    [SerializeField] private float interval = 2f;

    private void OnEnable()
    {
        if (animalPrefabs == null || animalPrefabs.Length == 0 || interval <= 0f)
        {
            Debug.LogError("Assign animal prefabs and a positive interval.", this);
            return;
        }
        foreach (GameObject prefab in animalPrefabs)
        {
            if (prefab == null)
            {
                Debug.LogError("Fill every animal prefab slot.", this);
                return;
            }
        }
        InvokeRepeating(nameof(SpawnAnimal), firstDelay, interval);
    }

    private void OnDisable()
    {
        CancelInvoke(nameof(SpawnAnimal));
    }

    private void SpawnAnimal()
    {
        int index = Random.Range(0, animalPrefabs.Length);
        float x = Random.Range(-xRange, xRange);
        Vector3 position = new Vector3(x, 0f, spawnZ);
        GameObject prefab = animalPrefabs[index];
        Instantiate(prefab, position, prefab.transform.rotation);
    }
}
