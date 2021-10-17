#include <set>
#include <cstdio>

int main() {
    std::set<long> numbers_set;
    long numbers_list[1000001];
    long input, target, x, y;
    int i, targets_found = 0;
    int length = 0;
    FILE *fp;
    fp = fopen("/mnt/c/prj/coursera/algorithms/02-graph-search-shortest-paths-and-data-structures/2sum/2sum.txt", "r");
    while (fscanf(fp, "%ld ", &input) == 1) {
        if (numbers_set.find(input) == numbers_set.end()) {
            numbers_set.insert(input);
            numbers_list[length] = input;
            length++;
        }
    }
    for (target = -10000; target < 10001; target++) {
        for (i = 0; i < length; i++) {
            x = numbers_list[i];
            y = x - target;
            if ((x != y) && (numbers_set.find(y) != numbers_set.end())) {
                targets_found++;
                printf("%ld\n", target);
                break;
            }
        }
    }
    printf("%d\n", targets_found);
    return 0;
}
