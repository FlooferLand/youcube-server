import { $ } from "bun";
import os from "os";
import process from "process";

const make = (os.platform() != "win32") ? "make" : "cmake"

// Installing sanjuuni
if (os.platform() != "win32") {
    await $`sudo apt install ffmpeg`.nothrow()
    await $`sudo apt install libavcodec53`.nothrow()
    await $`sudo apt install libavformat53`.nothrow()
} else {
    await $`winget install ffmpeg`.nothrow()
}
await $`git clone https://github.com/MCJack123/sanjuuni --recurse-submodules`.nothrow()
process.chdir("sanjuuni")

if (os.platform() != "win32") {
    await $`./configure`
}
await $`${make}`

// Installing YouCube
process.chdir("../")
if (os.platform() != "win32") {
    await $`${make} install-requirements`
} else {
    await $`${make} --build install-requirements`
}
