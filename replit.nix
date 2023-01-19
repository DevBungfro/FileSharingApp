{ pkgs }: {
	deps = [
		pkgs.npm i passport-jwt
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}