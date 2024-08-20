import { $ } from "bun";
import os from "os";
import process from "process";

// Installing sanjuuni
if (os.platform() != "win32") {
    await $`sudo apt install ffmpeg`
    await $`sudo apt install libavcodec53`
    await $`sudo apt install libavformat53`
} else {
    await $`winget install ffmpeg`
}
await $`git clone https://github.com/MCJack123/sanjuuni --recurse-submodules`
process.chdir("sanjuuni")
await $`./configure`
await $`make`

// Installing YouCube
process.chdir("../")
await $`make install-requirements`
