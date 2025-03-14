function sameLetters(word1, word2) {
    let count1 = 0;
    let count2 = 0;
    let N = 0;
    if (word1.length > word2.length) {
        N = word1.length;
    }
    else if (word2.length > word1.length) {
        N = word2.length;
    }
    else {
        N = word1.length;
    }
    for (let i = 0; i < N; ++i) {
        if (word2.includes(word1[i])) {
            count1 += 1;
        }
    }
    for (let i = 0; i < N; ++i) {
        if (word1.includes(word2[i])) {
            count2 += 1;
        }
    }
    if (count1 == count2) {
        return true;
    }
    else {
        return false;
    }
}
console.log(sameLetters('word-word', 'worqword'));
export {};
