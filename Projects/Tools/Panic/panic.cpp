#include <windows.h>

int main() {
    DbgPrintEx(DPFLTR_IHVDRIVER_ID, DPFLTR_ERROR_LEVEL, "Forcing a kernel panic\n");
    return 0;
}

// g++ panic.cpp -o panic.exe