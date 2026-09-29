using UnityEngine;

public class FeedAnimal : MonoBehaviour
{
    private bool fed;

    private void OnTriggerEnter(Collider other)
    {
        if (fed || !other.CompareTag("Food")) return;
        fed = true;
        other.gameObject.SetActive(false);
        Destroy(other.gameObject);
        Destroy(gameObject);
    }
}
