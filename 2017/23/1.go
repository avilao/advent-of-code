package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	instructions := make(map[int][]string)
	v := make(map[string]int)

	i := 0
	// build
	for scanner.Scan() {
		line := scanner.Text()
		inst := strings.Split(line, " ")
		instructions[i] = inst
		i++
	}

	v["a"] = 0
	v["b"] = 0
	v["c"] = 0
	v["d"] = 0
	v["e"] = 0
	v["f"] = 0
	v["g"] = 0
	v["h"] = 0

	muls := 0

	for i = 0; i < len(instructions); {
		current := instructions[i]
		i++

		switch current[0] {
		case "set":
			v[current[1]] = getOperand(v, current, 2)

		case "sub":
			v[current[1]] -= getOperand(v, current, 2)

		case "mul":
			v[current[1]] *= getOperand(v, current, 2)
			muls++

		case "jnz":
			if getOperand(v, current, 1) != 0 {
				i += getOperand(v, current, 2) - 1
			}
		}
	}
	fmt.Println(muls)
}

func getOperand(values map[string]int, inst []string, index int) int {

	op, err := strconv.Atoi(inst[index])
	if err != nil {
		op = values[inst[index]]
	}
	return op
}
