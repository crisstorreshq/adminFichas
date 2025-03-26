<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Carpeta;
use setasign\Fpdi\Fpdi;

class FichaDigitalizadaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'paciente_id' => 'required|exists:PAC_Carpeta,PAC_PAC_Numero',
            'ficha' => 'required|file|mimes:pdf|max:512000',
        ]);

        $paciente = Carpeta::findOrFail($request->paciente_id);

        $numeroFicha = $paciente->PAC_CAR_NumerFicha;

        $file = $request->file('ficha');

        $fileName = $numeroFicha . '.pdf';

        $uploaded = Storage::disk('ftp')->put($fileName, fopen($file, 'r+'));

        if ($uploaded) {
            $paciente->update(['Digital' => 1]);

            return response()->json([
                'message' => 'Ficha digitalizada y subida al FTP correctamente',
                'file_path' => $fileName
            ]);
        } else {
            return response()->json(['error' => 'Error al subir el archivo al FTP'], 500);
        }
    }

    public function agregarPdfAFicha(Request $request)
    {
        $request->validate([
            'paciente_id' => 'required|exists:PAC_Carpeta,PAC_PAC_Numero',
            'ficha' => 'required|file|mimes:pdf|max:512000',
        ]);

        $paciente = Carpeta::findOrFail($request->paciente_id);
        $numeroFicha = $paciente->PAC_CAR_NumerFicha;
        $fileName = $numeroFicha . '.pdf';

        if (!Storage::disk('ftp')->exists($fileName)) {
            return response()->json(['error' => 'El archivo de la ficha no existe en el FTP'], 404);
        }

        $existingPdf = Storage::disk('ftp')->get($fileName);
        $existingPath = storage_path("app/public/existing_{$fileName}");
        file_put_contents($existingPath, $existingPdf);

        $uploadedFile = $request->file('ficha');
        $uploadedPath = storage_path("app/public/uploaded_{$fileName}");
        $uploadedFile->move(storage_path('app/public/'), "uploaded_{$fileName}");

        $mergedPath = storage_path("app/public/merged_{$fileName}");
        $this->mergePdfs([$existingPath, $uploadedPath], $mergedPath);

        Storage::disk('ftp')->put($fileName, fopen($mergedPath, 'r+'));

        unlink($existingPath);
        unlink($uploadedPath);
        unlink($mergedPath);

        return response()->json([
            'message' => 'PDF agregado a la ficha correctamente',
            'file_path' => $fileName
        ]);
    }

    private function mergePdfs(array $pdfPaths, string $outputPath)
    {
        $pdf = new Fpdi();

        foreach ($pdfPaths as $path) {
            $pageCount = $pdf->setSourceFile($path);

            for ($i = 1; $i <= $pageCount; $i++) {
                $pdf->AddPage();
                $tplIdx = $pdf->importPage($i);
                $pdf->useTemplate($tplIdx);
            }
        }

        $pdf->Output($outputPath, 'F');
    }
}