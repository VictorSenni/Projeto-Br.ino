<?php
// Se acessar diretamente /EFAI, mostra mensagem padrão
$rota = $_GET['rota'] ?? null;

$csvFile = __DIR__ . "/EFAI.csv";
$redirects = [];

if (($handle = fopen($csvFile, "r")) !== FALSE) {
    $headers = fgetcsv($handle);
    while (($data = fgetcsv($handle)) !== FALSE) {
        if (isset($data[5], $data[6])) {
            $rotaCompleta = trim($data[5]);
            $urlDestino = trim($data[6]);
            $partes = parse_url($rotaCompleta);
            $path = $partes['path'] ?? '';
            $rotaRelativa = preg_replace('#^/?EFAI/#', '', ltrim($path, '/'));
            if ($rotaRelativa !== '' && $urlDestino !== '') {
                $redirects[$rotaRelativa] = $urlDestino;
            }
        }
    }
    fclose($handle);
}

if ($rota) {
    $rotaLimpa = trim($rota, '/');
    if (array_key_exists($rotaLimpa, $redirects)) {
        header("Location: " . $redirects[$rotaLimpa]);
        exit;
    } else {
        echo "Rota não encontrada!";
        exit;
    }
} else {
    echo "Bem-vindo ao EFAI!";
}