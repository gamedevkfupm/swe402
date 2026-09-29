using UnityEngine;

public class LaneCleanup : MonoBehaviour
{
    [SerializeField] private float upperZ = 25f;
    [SerializeField] private float lowerZ = -6f;
    [SerializeField] private bool reportMiss;

    private void Update()
    {
        if (transform.position.z > upperZ)
        {
            Destroy(gameObject);
        }
        else if (transform.position.z < lowerZ)
        {
            if (reportMiss) Debug.Log("Animal missed the feeding line.");
            Destroy(gameObject);
        }
    }
}
