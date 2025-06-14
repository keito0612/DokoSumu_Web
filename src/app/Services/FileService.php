<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class FileService
{
    protected string $disk;

    public function __construct(string $disk = 'public')
    {
        $this->disk = $disk;
    }

    /**
     * ファイルを保存する
     */
    public function upload(UploadedFile $file, string $path = '', string $fileName): string
    {
        return $this->getStorage()->putFileAs($path, $file, $fileName, 'public');
    }

    /**
     * ファイルのURLを取得する
     */
    public function getUrl(string $filePath): string
    {
        return $this->getStorage()->url($filePath);
    }

    /**
     * ファイルを削除する
     */
    public function delete(string $filePath): bool
    {
        return $this->getStorage()->delete($filePath);
    }

    /**
     * ファイルが存在するか確認する
     */
    public function exists(string $filePath): bool
    {
        return $this->getStorage()->exists($filePath);
    }

    /**
     * ファイルを取得する
     */
    public function get(string $filePath)
    {
        return $this->getStorage()->get($filePath);
    }

    /**
     * Storageインスタンスを取得する
     */
    protected function getStorage()
    {
        return Storage::disk($this->disk);
    }
}
