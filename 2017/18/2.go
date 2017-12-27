package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var values map[string][]int

func main() {
	// your code goes here
	scanner := bufio.NewScanner(os.Stdin)

	instructions := make(map[int][]string)
	values = make(map[string][]int)

	i := 0
	// build
	for scanner.Scan() {
		line := scanner.Text()
		inst := strings.Split(line, " ")
		instructions[i] = inst

		if inst[0] == "set" || inst[0] == "rcv" {
			values[inst[1]] = []int{0, 0}

		}
		i++
	}

	values["p"] = []int{0, 1}

	currentIndex := []int{0, 0}
	wait := []bool{false, false}
	queues := make(map[int][]int)
	sends := []int{0, 0}

	for {
		for m := 0; m < 2; m++ {

			inst := instructions[currentIndex[m]]
			currentIndex[m]++

			switch inst[0] {
			case "rcv":
				if len(queues[m]) > 0 {
					values[inst[1]][m] = queues[m][0]
					if len(queues[m]) == 1 {
						queues[m] = []int{}
					} else {
						queues[m] = queues[m][1:]
					}
					wait[m] = false
				} else {
					wait[m] = true
					currentIndex[m]--
				}

			case "set":
				values[inst[1]][m] = getOperandValue(inst, 2, m)

			case "snd":
				queues[(m+1)%2] = append(queues[(m+1)%2], getOperandValue(inst, 1, m))
				sends[m]++

			case "add":
				values[inst[1]][m] += getOperandValue(inst, 2, m)

			case "mul":
				values[inst[1]][m] *= getOperandValue(inst, 2, m)

			case "mod":
				values[inst[1]][m] %= getOperandValue(inst, 2, m)

			case "jgz":
				if getOperandValue(inst, 1, m) > 0 {
					currentIndex[m] += getOperandValue(inst, 2, m) - 1
				}
			}

		}

		if wait[0] && wait[1] && len(queues[0]) == 0 && len(queues[1]) == 0 {
			break
		}
	}
	fmt.Print(sends[1])
}

func getOperandValue(instruction []string, operatorIndex int, index int) int {

	op, err := strconv.Atoi(instruction[operatorIndex])
	if err != nil {
		op = values[instruction[operatorIndex]][index]
	}

	return op
}
