using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{
    public List<GameObject> targets;
    private float spawnRate = 1.5f;
    public TMP_Text scoreText;
    private int score;
    public TMP_Text gameOverText;
    public bool isGameActive;
    public Button restartButton;

    private void Start()
    {
        isGameActive = true;
        gameOverText.gameObject.SetActive(false);
        restartButton.gameObject.SetActive(false);
        score = 0;
        UpdateScore(0);
        StartCoroutine(SpawnTarget());
    }

    private IEnumerator SpawnTarget()
    {
        while (isGameActive)
        {
            yield return new WaitForSeconds(spawnRate);
            if (!isGameActive) yield break;
            int index = Random.Range(0, targets.Count);
            Instantiate(targets[index]);
        }
    }

    public void UpdateScore(int scoreToAdd)
    {
        if (!isGameActive) return;
        score += scoreToAdd;
        scoreText.text = "Score: " + score;
    }

    public void GameOver()
    {
        if (!isGameActive) return;
        isGameActive = false;
        restartButton.gameObject.SetActive(true);
        gameOverText.gameObject.SetActive(true);
    }

    public void RestartGame()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }
}
