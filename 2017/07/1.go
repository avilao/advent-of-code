package main

import "fmt"
import "os"
import "bufio"
import "strings"

//import "strconv"

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	h := make(map[string][]string)
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

	for k, y := range c {
		if y == 0 {
			fmt.Print(k)
		}
	}
}
