# map-experiment
### Docker内で開発するなら
* Docker環境
* [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

を使います

### [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
VScodeの拡張機能です。コマンド
```
Reopen in Container
```
でこのフォルダを開けば、Docker内で開発環境使えます。  
* この拡張機能の設定ファイル群は.devcontainerフォルダ内に入っております。  
* プロキシ環境だったので、.envで設定してます。  
* 使ってないんですが、Postgresも立ち上がります…（いつか繋げてやり取りしたいなと考えて）