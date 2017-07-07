import sys
with open("./scripts/data/testset.csv", "a") as testFile:
    testFile.write(sys.argv[1] + ',' + sys.argv[2] + '\n')

print('All good!')
# Send output to Node
sys.stdout.flush()
