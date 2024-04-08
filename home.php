<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculateur de prise de poids</title>
</head>
<body>
    <h2>Calculateur de prise de poids</h2>
    <form method="post">
        <label for="weight">Poids (kg) :</label>
        <input type="number" id="weight" name="weight" value="<?php echo isset($_POST['weight']) ? $_POST['weight'] : ''; ?>" required>
        <button type="submit" name="calculate">Calculer</button>
    </form>
    <?php
if(isset($_POST['calculate'])) {
        $weight = $_POST['weight']; // poids en kg
        $height = 160; // taille en cm (hypothétique, peut être ajustée)
        $age = 25; // âge en années (hypothétique, peut être ajusté)
        $activityLevel = 1.5; // niveau d'activité physique (modéré, peut être ajusté)

        // Calcul du métabolisme de base (MB)
        $basalMetabolicRate = 10 * $weight + 6.25 * $height - 5 * $age + 5; // Equation de Harris-Benedict pour une femme

        // Calcul de l'apport calorique total pour la prise de poids
        $totalCalories = $basalMetabolicRate * $activityLevel + 500; // Ajouter 500 calories pour la prise de poids

        // Répartition des macronutriments
        $proteinPercentage = 0.18; // 18% des calories totales sous forme de protéines
        $carbsPercentage = 0.55; // 55% des calories totales sous forme de glucides
        $fatsPercentage = 0.27; // 27% des calories totales sous forme de lipides

        // Calcul des calories pour chaque macronutriment
        $proteinCalories = $totalCalories * $proteinPercentage;
        $carbsCalories = $totalCalories * $carbsPercentage;
        $fatsCalories = $totalCalories * $fatsPercentage;

        // Conversion des calories en grammes
        $proteinGrams = $proteinCalories / 4; // 1 gramme de protéines = 4 calories
        $carbsGrams = $carbsCalories / 4; // 1 gramme de glucides = 4 calories
        $fatsGrams = $fatsCalories / 9; // 1 gramme de lipides = 9 calories

        // Affichage des résultats
        echo "<h3>Résultats :</h3>";
        echo "<p>Calories : " . round($totalCalories) . "</p>";
        echo "<p>Protéines (g) : " . round($proteinGrams, 2) . "</p>";
        echo "<p>Glucides (g) : " . round($carbsGrams, 2) . "</p>";
        echo "<p>Lipides (g) : " . round($fatsGrams, 2) . "</p>";
    }
    ?>
</body>
</html>