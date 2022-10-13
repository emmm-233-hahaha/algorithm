class TrieNode {
    constructor() {
        this.pass = 0;
        this.end = 0;
        this.nexts = new Array(26).fill(null);
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    /**
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        if (word === '')
            return;
        let curNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let charIndex = word.charAt(i).charCodeAt() - 'a'.charCodeAt();
            if (curNode.nexts[charIndex] === null) {
                curNode.nexts[charIndex] = new TrieNode();
            }
            curNode = curNode.nexts[charIndex];
            curNode.pass++;
        }
        curNode.end++;
    }
    /**
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        if (word === '')
            return false;
        let curNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let charIndex = word.charAt(i).charCodeAt() - 'a'.charCodeAt();
            if (curNode.nexts[charIndex] === null) {
                return false;
            }
            curNode = curNode.nexts[charIndex];
        }
        if (curNode.end > 0) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        if (prefix === '')
            return false;
        let curNode = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let charIndex = prefix.charAt(i).charCodeAt() - 'a'.charCodeAt();
            console.log(prefix.charAt(i))
            if (curNode.nexts[charIndex] === null) {
                return false;
            }
            curNode = curNode.nexts[charIndex];
        }
        return curNode.pass > 0;
    }
}




/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

var obj = new Trie();
obj.insert('hotdog');
console.log(obj.search('dog'));
// var param_2 = obj.search(word)
console.log(obj.startsWith('dog'));