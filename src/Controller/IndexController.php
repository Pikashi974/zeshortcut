<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class IndexController extends AbstractController
{
    #[Route('/getMeal', name: 'app_index')]
    public function index()
    {
        // return $this->json([
        //     'message' => 'Welcome to your new controller!',
        //     'path' => 'src/Controller/IndexController.php',
        // ]);

        $totalKcal = $_POST['calorie'];
$nbJour = $_POST['nbJour'];
    $totalProtein = $totalKcal * 0.2;
    $totalLipide = $totalKcal * 0.3;
    $totalGlucide = $totalKcal * 0.5;

    $proteinPerDay = $totalProtein / 4;
    $lipidePerDay = $totalLipide / 9;
    $glucidePerDay = $totalGlucide / 4;

    $protein = $proteinPerDay / $nbJour;
    $lipide = $lipidePerDay / $nbJour;
    $glucide = $glucidePerDay / $nbJour;

    // echo "Vous avez besoin de manger ", round ($totalKcal),"Kcal au total <br>", 
    // "Pour chaque repas (3 Repas dans la journee) vous aurez besoin de consommer <br>",
    // round ($protein), "g De proteine <br>",
    // round ($lipide), "g De Lipide <br>", 
    // round ($glucide), "g De glucide <br>";


$curl = curl_init();

curl_setopt_array($curl, [
  CURLOPT_URL => "http://192.168.0.69:5001/repas/grossir",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n  \"calories\" : ".$totalKcal.",\n  \"proteines\" : ".$protein.",\n  \"lipides\" : ".$lipide.",\n  \"glucides\" : ".$glucide."\n}\n",
  CURLOPT_HTTPHEADER => [
    "Accept: */*",
    "Content-Type: application/json",

  ],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

// if ($err) {
//   echo "cURL Error #:" . $err;
// } else {
//   echo $response;
// }
$repas = new JsonResponse($response);

$jsonData = json_encode($repas);

echo $jsonData;
$decodeData = json_decode($jsonData, true);
return $decodeData;
    }
}
