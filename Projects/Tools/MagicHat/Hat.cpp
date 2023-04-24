#include <iostream>
#include <vector>
#include <cstdlib>
#include <ctime>
using namespace std;

// Fisher-Yates shuffle algorithm
void shuffle(vector<string>& words) {
    srand(time(NULL));
    int n = words.size();
    for (int i = n - 1; i >= 1; i--) {
        int j = rand() % (i + 1);
        swap(words[i], words[j]);
    }
}

int main() {

    cout << "Enter items (separated by spaces): ";
    string input;
    getline(cin, input);

    vector<string> words;
    string word;
    for (char c : input) {
        if (c == ' ') {
            words.push_back(word);
            word.clear();
        } else {
            word += c;
        }
    }
    if (!word.empty()) {
        words.push_back(word);
    }

    shuffle(words);

    cout << "Random words: ";
    for (string word : words) {
        cout << word << " ";
    }
    cout << endl;

    return 0;
}