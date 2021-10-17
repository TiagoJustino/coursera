with open("2sum.txt") as file:
    lines = file.readlines()
    numbers_set = set(int(line.strip()) for line in lines if line)

numbers_list = list(numbers_set)

targets_found = 0
for target in range(-10000, 10001):
    for x in numbers_list:
        y = target - x
        if y != x and y in numbers_set:
            print(target)
            targets_found += 1
            break

print(targets_found)
