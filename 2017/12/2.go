package main

import "fmt"
import "os"
import "bufio"
import "strings"

var s []string
var toSearch []string
var g map[string][]string

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	g = make(map[string][]string)

	for scanner.Scan() {
		s := scanner.Text()

		key := ""
		i := 0

		for _, n := range strings.Fields(s) {
			if i == 0 {
				key = n
				toSearch = append(toSearch, key)
			}

			if i >= 2 {
				sTmp := strings.Replace(n, ",", "", -1)
				g[key] = append(g[key], sTmp)
			}

			i++
		}
	}

	groups := 0

	for {
		if len(toSearch) == 0 {
			break
		}

		searchNode(toSearch[0])
		groups++
	}

	fmt.Println(groups)

}

func searchNode(key string) {
	s = append(s, key)
	markVisited(key)

	for _, k := range g[key] {
		if !contains(k, s) {
			searchNode(k)
		}
	}
}

func contains(key string, a []string) bool {

	for _, v := range a {

		if key == v {
			return true
		}
	}

	return false
}

func markVisited(key string) {
	var a []string
	for _, v := range toSearch {
		if v != key {
			a = append(a, v)
		}

	}
	toSearch = a
}
