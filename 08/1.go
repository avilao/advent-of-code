package main

import "fmt"
import "os"
import "bufio"
import "strings"
import "strconv"

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	v := make(map[string]int)
	for scanner.Scan() {
		line := scanner.Text()

		inst := strings.Split(line, " ")
		n1, _ := strconv.Atoi(inst[6])

		doInst := checkInst(v[inst[4]], inst[5], n1)
		if doInst {
			n2, _ := strconv.Atoi(inst[2])
			if inst[1] == "inc" {
				v[inst[0]] += n2
			} else {
				v[inst[0]] -= n2
			}

		}
	}

	max := -9999999
	for _, v := range v {
		if v > max {
			max = v
		}
	}

	fmt.Println(max)

}

func checkInst(s int, op string, v int) bool {
	switch op {
	case ">":
		return s > v
	case "<":
		return s < v
	case ">=":
		return s >= v
	case "<=":
		return s <= v
	case "!=":
		return s != v
	case "==":
		return s == v
	}

	return true
}
