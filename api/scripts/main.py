# Author: Bing Steup <bingsteup at gmail dot com>
# License: BSD 3 clause
import os
import sys
import argparse
import csv
from sklearn.externals import joblib
from sklearn import datasets, svm, metrics

parser = argparse.ArgumentParser()
parser.add_argument('--api', help='foo help')
args = parser.parse_args()

workingDir = './data'
if args.api:
  workingDir = './scripts/data'

# Get set from csv
files = os.listdir(workingDir)
for file in files:
  if not (file.endswith('.csv')):
    continue
  setIdentifier = file[:-4]

  # setIdentifier = sys.argv[1]s
  X = []
  y = []

  with open(workingDir + '/' + setIdentifier + '.csv') as f:
    cf = csv.reader(f)
    for row in cf:
      y.append(row.pop(0))
      X.append(row)

  # Create a classifier: a support vector classifier
  classifier = svm.SVC(gamma=0.001)
  classifier.fit(X, y)

  # Persist
  joblib.dump(classifier, workingDir + '/' + setIdentifier + '.pkl')

  # Print stats from test set
  if not args.api:
    print(setIdentifier)

    counts = {}
    for index, val in enumerate(set(y)):
      counts[val] = 0

    for index, val in enumerate(y):
      counts[val] = counts[val] + 1

    print('Total: %s' % len(y))
    for index, val in enumerate(sorted(counts)):
      print('%s\t%s\t%s%%' % (val, counts[val], str(round(counts[val] / len(y) * 100, 2))))

    print('\n----------------\n')

if args.api:
  print('All good!')
  # Send output to Node
  sys.stdout.flush()
