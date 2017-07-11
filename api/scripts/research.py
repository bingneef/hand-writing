# Author: Bing Steup <bingsteup at gmail dot com>
# License: BSD 3 clause
import os
import sys
import argparse
import csv
from sklearn.model_selection import train_test_split
from sklearn.externals import joblib
from sklearn import datasets, svm, metrics

parser = argparse.ArgumentParser()
parser.add_argument('--api', help='foo help')
args = parser.parse_args()

workingDir = './data'

print('\n----------------\n')

# Get set from csv
files = os.listdir(workingDir)
for file in files:
  if not (file.endswith('.csv')):
    continue
  setIdentifier = file[:-4]

  # Print stats from test set
  print(setIdentifier)

  # setIdentifier = sys.argv[1]s
  X = []
  y = []

  with open(workingDir + '/' + setIdentifier + '.csv') as f:
    cf = csv.reader(f)
    for row in cf:
      y.append(row.pop(0))
      X.append(row)

  X_train, X_test, y_train, y_test = \
    train_test_split(X, y, test_size=.2, random_state=42)

  counts = {}
  for index, val in enumerate(set(y)):
    counts[val] = 0

  for index, val in enumerate(y):
    counts[val] = counts[val] + 1

  print('Total: %s' % len(y))
  for index, val in enumerate(sorted(counts)):
    print('%s\t%s\t%s%%' % (val, counts[val], str(round(counts[val] / len(y) * 100, 2))))

  print('\n::::::::::::::::\n')
  gammaValues = [0.00001, 0.00005, 0.0001, 0.0005, 0.0010, 0.0050, 0.0100, 0.1000, 1.0000]
  for index, gamma in enumerate(gammaValues):
    # Create a classifier: a support vector classifier
    classifier = svm.SVC(gamma=gamma)
    classifier.fit(X_train, y_train)
    print('%s\t ->  %s' % (gamma, classifier.score(X_test, y_test)))

  print('\n----------------\n')
