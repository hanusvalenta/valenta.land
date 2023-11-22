#include <windows.h>

int main() {
    // Replace 0x00000000 with the desired kernel address
    int* invalid_address = (int*)0x00000000;
    *invalid_address = 1337;
    return 0;
}