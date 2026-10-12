using UnityEngine;
using UnityEngine.UI;

public class DifficultyButton : MonoBehaviour
{
    public GameManager gameManager;
    [Range(1, 3)] public int difficulty = 1;
    private Button button;

    private void Start()
    {
        button = GetComponent<Button>();
        button.onClick.AddListener(SetDifficulty);
    }

    private void SetDifficulty()
    {
        gameManager.StartGame(difficulty);
    }
}
