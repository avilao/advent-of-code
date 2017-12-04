package main

import "fmt"
import "os"
import "bufio"
import "strings"
import "sort"

func main() {
	// your code goes here
	//var m map[string]int
	scanner := bufio.NewScanner(os.Stdin)
	sum := 0

	for scanner.Scan() {
		s := scanner.Text()

		m := make(map[string]int)
		for _, n := range strings.Fields(s) {
			m[SortStringByCharacter(n)]++
		}

		if !containsDuplicate(m) {
			sum++
		}
	}

	fmt.Print(sum)

}

type ByRune []rune

func (r ByRune) Len() int           { return len(r) }
func (r ByRune) Swap(i, j int)      { r[i], r[j] = r[j], r[i] }
func (r ByRune) Less(i, j int) bool { return r[i] < r[j] }

func StringToRuneSlice(s string) []rune {
	var r []rune
	for _, runeValue := range s {
		r = append(r, runeValue)
	}
	return r
}

func SortStringByCharacter(s string) string {
	var r ByRune = StringToRuneSlice(s)
	sort.Sort(r)
	return string(r)
}

func containsDuplicate(m map[string]int) bool {
	for _, x := range m {
		if x > 1 {
			return true
		}
	}
	return false
}
