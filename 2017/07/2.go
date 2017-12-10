package main

import "fmt"
import "os"
import "bufio"
import "strings"
import "strconv"

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	h := make(map[string][]string)
	w := make(map[string]int)
	c := make(map[string]int)

	for scanner.Scan() {
		s := scanner.Text()

		i := 0
		key := ""
		sTmp := ""
		for _, n := range strings.Fields(s) {
			if i == 0 {
				key = n
				c[key] = 0
			}

			if i == 1 {
				sTmp = strings.Replace(n, "(", "", -1)
				sTmp = strings.Replace(sTmp, ")", "", -1)
				l, _ := strconv.Atoi(sTmp)
				w[key] = l
			}
			if i >= 3 {
				sTmp = strings.Replace(n, ",", "", -1)
				h[key] = append(h[key], sTmp)
			}

			i++
		}

	}

	for _, v := range h {
		for _, y := range v {
			c[y]++
		}

	}

	root := ""
	for k, y := range c {
		if y == 0 {
			root = k
		}
	}

	calcNode(root, h, w)
}

func calcNode(key string, h map[string][]string, w map[string]int) int {
	sum := w[key]

	var childSum []int

	for i := 0; i < len(h[key]); i++ {
		v := calcNode(h[key][i], h, w)
		sum += v
		childSum = append(childSum, v)
	}

	if !equalElements(childSum) {
		wrongIndex := differentElementIndex(childSum)

		diff := childSum[wrongIndex] - childSum[(wrongIndex+1)%len(childSum)]

		fmt.Println(childSum, w[h[key][wrongIndex]]-diff)
	}

	return sum
}

func equalElements(a []int) bool {

	for i := 1; i < len(a); i++ {
		if a[i] != a[0] {
			return false
		}
	}
	return true
}

func differentElementIndex(a []int) int {
	if len(a) < 3 {
		return -1
	}

	for i := 0; i < len(a); i++ {
		searchValue := a[i]
		occurrences := 0
		for j := 0; j < len(a); j++ {
			if a[j] == searchValue {
				occurrences++
			}
		}

		if occurrences == 1 {
			return i
		}
	}

	return -1
}
