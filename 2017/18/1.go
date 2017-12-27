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

		if inst[0] == "set" {
			v[inst[1]] = 0
		}
		i++
	}

	last := 0

	for i = 0; i < len(instructions); {
		current := instructions[i]
		i++

		switch current[0] {
		case "rcv":
			if getOperand(v, current, 1) != 0 {
				i = len(instructions)
			}

		case "set":
			v[current[1]] = getOperand(v, current, 2)

		case "snd":
			last = getOperand(v, current, 1)

		case "add":
			v[current[1]] += getOperand(v, current, 2)

		case "mul":
			v[current[1]] *= getOperand(v, current, 2)

		case "mod":
			v[current[1]] %= getOperand(v, current, 2)

		case "jgz":
			if getOperand(v, current, 1) > 0 {
				i += getOperand(v, current, 2) - 1
			}
		}
	}

	fmt.Println(last)
}

func getOperand(values map[string]int, inst []string, index int) int {

	op, err := strconv.Atoi(inst[index])
	if err != nil {
		op = values[inst[index]]
	}
	return op
}
