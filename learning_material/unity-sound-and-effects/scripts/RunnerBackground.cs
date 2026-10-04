using UnityEngine;

public class RunnerBackground : MonoBehaviour
{
    [SerializeField] private RunnerController runner;
    [SerializeField] private Renderer backgroundTile;
    [SerializeField] private float speed = 6f;
    private Vector3 startPosition;
    private float repeatWidth;
    private float distance;

    private void Start()
    {
        startPosition = transform.position;
        repeatWidth = backgroundTile.bounds.size.x;
        GameObject nextTile = Instantiate(backgroundTile.gameObject, transform);
        nextTile.transform.position = backgroundTile.transform.position
            + Vector3.right * repeatWidth;
    }

    private void Update()
    {
        if (runner == null || runner.GameOver || repeatWidth <= 0f) return;
        distance = Mathf.Repeat(distance + speed * Time.deltaTime, repeatWidth);
        transform.position = startPosition + Vector3.left * distance;
    }
}
