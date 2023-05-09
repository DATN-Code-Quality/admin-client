import axios from 'axios';

import { fetch, getWithPath } from '../api.http';

import {
  ListSonarqube,
  MoreInfoProject,
  Submission,
  SubmissionResponse,
} from '~/domain/sonarqube';
const API_SONARQUBE_DOMAIN = 'http://localhost:5000/api/sonarqube';
export function useSonarqube() {
  return {
    async getProjects(): Promise<ListSonarqube> {
      // const data = await getWithPath(API.SESSION_LOG.GET.SESSION_LOG);
      // const data = await fetch(
      //   'https://af2c-54-151-141-45.ap.ngrok.io/api/components/search_projects?ps=50&facets=reliability_rating,security_rating,security_review_rating,sqale_rating,coverage,duplicated_lines_density,ncloc,alert_status,languages,tags,qualifier&f=analysisDate,leakPeriodDate'
      // ).then((res) => console.log(res));
      return {
        paging: {
          pageIndex: 1,
          pageSize: 50,
          total: 2,
        },
        components: [
          {
            key: 'sd',
            name: 'sd',
            qualifier: 'TRK',
            isFavorite: false,
            analysisDate: '2023-02-13T15:06:24+0000',
            tags: [],
            visibility: 'public',
            leakPeriodDate: '2023-02-11T09:18:40+0000',
            needIssueSync: false,
          },
          {
            key: 'Second',
            name: 'Second',
            qualifier: 'TRK',
            isFavorite: false,
            analysisDate: '2023-01-23T03:52:23+0000',
            tags: [],
            visibility: 'public',
            needIssueSync: false,
          },
        ],
        facets: [
          {
            property: 'coverage',
            values: [
              {
                val: 'NO_DATA',
                count: 0,
              },
              {
                val: '*-30.0',
                count: 2,
              },
              {
                val: '30.0-50.0',
                count: 0,
              },
              {
                val: '50.0-70.0',
                count: 0,
              },
              {
                val: '70.0-80.0',
                count: 0,
              },
              {
                val: '80.0-*',
                count: 0,
              },
            ],
          },
          {
            property: 'alert_status',
            values: [
              {
                val: 'ERROR',
                count: 0,
              },
              {
                val: 'OK',
                count: 2,
              },
            ],
          },
          {
            property: 'reliability_rating',
            values: [
              {
                val: '1',
                count: 1,
              },
              {
                val: '2',
                count: 0,
              },
              {
                val: '3',
                count: 1,
              },
              {
                val: '4',
                count: 0,
              },
              {
                val: '5',
                count: 0,
              },
            ],
          },
          {
            property: 'duplicated_lines_density',
            values: [
              {
                val: '*-3.0',
                count: 2,
              },
              {
                val: '3.0-5.0',
                count: 0,
              },
              {
                val: '5.0-10.0',
                count: 0,
              },
              {
                val: '10.0-20.0',
                count: 0,
              },
              {
                val: '20.0-*',
                count: 0,
              },
              {
                val: 'NO_DATA',
                count: 0,
              },
            ],
          },
          {
            property: 'languages',
            values: [
              {
                val: 'py',
                count: 2,
              },
              {
                val: 'xml',
                count: 2,
              },
              {
                val: 'css',
                count: 1,
              },
              {
                val: 'java',
                count: 1,
              },
              {
                val: 'js',
                count: 1,
              },
              {
                val: 'ts',
                count: 1,
              },
              {
                val: 'web',
                count: 1,
              },
            ],
          },
          {
            property: 'security_rating',
            values: [
              {
                val: '1',
                count: 2,
              },
              {
                val: '2',
                count: 0,
              },
              {
                val: '3',
                count: 0,
              },
              {
                val: '4',
                count: 0,
              },
              {
                val: '5',
                count: 0,
              },
            ],
          },
          {
            property: 'qualifier',
            values: [
              {
                val: 'APP',
                count: 0,
              },
              {
                val: 'TRK',
                count: 2,
              },
            ],
          },
          {
            property: 'ncloc',
            values: [
              {
                val: '*-1000.0',
                count: 2,
              },
              {
                val: '1000.0-10000.0',
                count: 0,
              },
              {
                val: '10000.0-100000.0',
                count: 0,
              },
              {
                val: '100000.0-500000.0',
                count: 0,
              },
              {
                val: '500000.0-*',
                count: 0,
              },
            ],
          },
          {
            property: 'security_review_rating',
            values: [
              {
                val: '1',
                count: 2,
              },
              {
                val: '2',
                count: 0,
              },
              {
                val: '3',
                count: 0,
              },
              {
                val: '4',
                count: 0,
              },
              {
                val: '5',
                count: 0,
              },
            ],
          },
          {
            property: 'tags',
            values: [],
          },
          {
            property: 'sqale_rating',
            values: [
              {
                val: '1',
                count: 2,
              },
              {
                val: '2',
                count: 0,
              },
              {
                val: '3',
                count: 0,
              },
              {
                val: '4',
                count: 0,
              },
              {
                val: '5',
                count: 0,
              },
            ],
          },
        ],
      };
      //   console.log
    },

    async getMoreInfoOfProjectsByKeys(): Promise<MoreInfoProject> {
      // const data = await getWithPath(API.SESSION_LOG.GET.SESSION_LOG);
      // const data = await fetch(
      //   'https://af2c-54-151-141-45.ap.ngrok.io/api/components/search_projects?ps=50&facets=reliability_rating,security_rating,security_review_rating,sqale_rating,coverage,duplicated_lines_density,ncloc,alert_status,languages,tags,qualifier&f=analysisDate,leakPeriodDate'
      // ).then((res) => console.log(res));
      return {
        measures: [
          {
            metric: 'alert_status',
            value: 'OK',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
          },
          {
            metric: 'alert_status',
            value: 'OK',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
          },
          {
            metric: 'alert_status',
            value: 'OK',
            component: '19120721_ASS_0001_1680167139884',
          },
          {
            metric: 'alert_status',
            value: 'OK',
            component: 'FirstTest',
          },
          {
            metric: 'alert_status',
            value: 'OK',
            component: 'sd',
          },
          {
            metric: 'bugs',
            value: '1',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: false,
          },
          {
            metric: 'bugs',
            value: '1',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: false,
          },
          {
            metric: 'bugs',
            value: '1',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: false,
          },
          {
            metric: 'bugs',
            value: '2',
            component: 'FirstTest',
            bestValue: false,
          },
          {
            metric: 'bugs',
            value: '1',
            component: 'sd',
            bestValue: false,
          },
          {
            metric: 'code_smells',
            value: '11',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: false,
          },
          {
            metric: 'code_smells',
            value: '11',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: false,
          },
          {
            metric: 'code_smells',
            value: '11',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: false,
          },
          {
            metric: 'code_smells',
            value: '549',
            component: 'FirstTest',
            bestValue: false,
          },
          {
            metric: 'code_smells',
            value: '12',
            component: 'sd',
            bestValue: false,
          },
          {
            metric: 'coverage',
            value: '0.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: false,
          },
          {
            metric: 'coverage',
            value: '0.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: false,
          },
          {
            metric: 'coverage',
            value: '0.0',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: false,
          },
          {
            metric: 'coverage',
            value: '0.0',
            component: 'FirstTest',
            bestValue: false,
          },
          {
            metric: 'coverage',
            value: '0.0',
            component: 'sd',
            bestValue: false,
          },
          {
            metric: 'duplicated_lines_density',
            value: '0.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: true,
          },
          {
            metric: 'duplicated_lines_density',
            value: '0.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: true,
          },
          {
            metric: 'duplicated_lines_density',
            value: '0.0',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: true,
          },
          {
            metric: 'duplicated_lines_density',
            value: '2.6',
            component: 'FirstTest',
            bestValue: false,
          },
          {
            metric: 'duplicated_lines_density',
            value: '0.0',
            component: 'sd',
            bestValue: true,
          },
          {
            metric: 'ncloc',
            value: '156',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
          },
          {
            metric: 'ncloc',
            value: '156',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
          },
          {
            metric: 'ncloc',
            value: '156',
            component: '19120721_ASS_0001_1680167139884',
          },
          {
            metric: 'ncloc',
            value: '3193',
            component: 'FirstTest',
          },
          {
            metric: 'ncloc',
            value: '161',
            component: 'sd',
          },
          {
            metric: 'ncloc_language_distribution',
            value: 'py=156',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
          },
          {
            metric: 'ncloc_language_distribution',
            value: 'py=156',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
          },
          {
            metric: 'ncloc_language_distribution',
            value: 'py=156',
            component: '19120721_ASS_0001_1680167139884',
          },
          {
            metric: 'ncloc_language_distribution',
            value: 'java=3146;xml=47',
            component: 'FirstTest',
          },
          {
            metric: 'ncloc_language_distribution',
            value: 'py=161',
            component: 'sd',
          },
          {
            metric: 'reliability_rating',
            value: '3.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: false,
          },
          {
            metric: 'reliability_rating',
            value: '3.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: false,
          },
          {
            metric: 'reliability_rating',
            value: '3.0',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: false,
          },
          {
            metric: 'reliability_rating',
            value: '5.0',
            component: 'FirstTest',
            bestValue: false,
          },
          {
            metric: 'reliability_rating',
            value: '3.0',
            component: 'sd',
            bestValue: false,
          },
          {
            metric: 'security_hotspots_reviewed',
            value: '0.0',
            component: 'FirstTest',
            bestValue: false,
          },
          {
            metric: 'security_rating',
            value: '1.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: true,
          },
          {
            metric: 'security_rating',
            value: '1.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: true,
          },
          {
            metric: 'security_rating',
            value: '1.0',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: true,
          },
          {
            metric: 'security_rating',
            value: '1.0',
            component: 'FirstTest',
            bestValue: true,
          },
          {
            metric: 'security_rating',
            value: '1.0',
            component: 'sd',
            bestValue: true,
          },
          {
            metric: 'security_review_rating',
            value: '1.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: true,
          },
          {
            metric: 'security_review_rating',
            value: '1.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: true,
          },
          {
            metric: 'security_review_rating',
            value: '1.0',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: true,
          },
          {
            metric: 'security_review_rating',
            value: '5.0',
            component: 'FirstTest',
            bestValue: false,
          },
          {
            metric: 'security_review_rating',
            value: '1.0',
            component: 'sd',
            bestValue: true,
          },
          {
            metric: 'sqale_rating',
            value: '1.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: true,
          },
          {
            metric: 'sqale_rating',
            value: '1.0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: true,
          },
          {
            metric: 'sqale_rating',
            value: '1.0',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: true,
          },
          {
            metric: 'sqale_rating',
            value: '1.0',
            component: 'FirstTest',
            bestValue: true,
          },
          {
            metric: 'sqale_rating',
            value: '1.0',
            component: 'sd',
            bestValue: true,
          },
          {
            metric: 'vulnerabilities',
            value: '0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680196776248',
            bestValue: true,
          },
          {
            metric: 'vulnerabilities',
            value: '0',
            component:
              '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_ASS_0001_1680197484196',
            bestValue: true,
          },
          {
            metric: 'vulnerabilities',
            value: '0',
            component: '19120721_ASS_0001_1680167139884',
            bestValue: true,
          },
          {
            metric: 'vulnerabilities',
            value: '0',
            component: 'FirstTest',
            bestValue: true,
          },
          {
            metric: 'vulnerabilities',
            value: '0',
            component: 'sd',
            bestValue: true,
          },
        ],
      };
    },

    async getIssuesSubmission(
      submissionId: string,
      params?: Record<string, unknown>
    ): Promise<SubmissionResponse> {
      const response = await axios
        .get(`${API_SONARQUBE_DOMAIN}/issue/${submissionId}`, { params })
        .then((res) => {
          return res.data;
        })
        .catch(() => {
          console.log(123);
        });

      // const response = {
      //   id: Math.random(),
      //   statusCode: 0,
      //   issues: {
      //     total: 12,
      //     p: 1,
      //     ps: 100,
      //     effortTotal: 48,
      //     issues: [
      //       {
      //         key: 'AYc8aEiaPn0W90a48Gt_',
      //         rule: 'python:S1542',
      //         severity: 'MAJOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/crawlData.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 3,
      //         hash: '9cd20bf9a7c7fc9aabc6855a48841943',
      //         textRange: {
      //           startLine: 3,
      //           endLine: 3,
      //           startOffset: 4,
      //           endOffset: 18,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Rename function "getContentPage" to match the regular expression ^[a-z_][a-z0-9_]*$.',
      //         effort: '10min',
      //         debt: '10min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEiaPn0W90a48GuA',
      //         rule: 'python:S1542',
      //         severity: 'MAJOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/crawlData.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 7,
      //         hash: 'f04977a1c07b7c6177b9af2b9f1d4d54',
      //         textRange: {
      //           startLine: 7,
      //           endLine: 7,
      //           startOffset: 4,
      //           endOffset: 15,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Rename function "getReaction" to match the regular expression ^[a-z_][a-z0-9_]*$.',
      //         effort: '10min',
      //         debt: '10min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEiaPn0W90a48Gt-',
      //         rule: 'python:S1192',
      //         severity: 'CRITICAL',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/crawlData.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 16,
      //         hash: 'ec88743ae89db80dd747ebfc85524622',
      //         textRange: {
      //           startLine: 16,
      //           endLine: 16,
      //           startOffset: 34,
      //           endOffset: 51,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Define a constant instead of duplicating this literal "reaction_count:" 3 times.',
      //         effort: '6min',
      //         debt: '6min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEiaPn0W90a48GuB',
      //         rule: 'python:S5806',
      //         severity: 'MAJOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/crawlData.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 20,
      //         hash: '5664d35c013f24dae04e4a0bf3f30885',
      //         textRange: {
      //           startLine: 20,
      //           endLine: 20,
      //           startOffset: 12,
      //           endOffset: 16,
      //         },
      //         status: 'OPEN',
      //         message: 'Rename this variable; it shadows a builtin.',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEiaPn0W90a48GuC',
      //         rule: 'python:S2201',
      //         severity: 'MAJOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/crawlData.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 29,
      //         hash: '622ed6f6fe933885cc65b05c3dd0316c',
      //         textRange: {
      //           startLine: 29,
      //           endLine: 29,
      //           startOffset: 8,
      //           endOffset: 21,
      //         },
      //         status: 'OPEN',
      //         message: 'The return value of "str.split" must be used.',
      //         effort: '5min',
      //         debt: '5min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'BUG',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEpTPn0W90a48GuD',
      //         rule: 'python:S2208',
      //         severity: 'CRITICAL',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/main.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 2,
      //         hash: '3560f9e95a271adb49bbecd3cb9516c5',
      //         textRange: {
      //           startLine: 2,
      //           endLine: 2,
      //           startOffset: 0,
      //           endOffset: 29,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Import only needed names or import the module and then use its members.',
      //         effort: '5min',
      //         debt: '5min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEpTPn0W90a48GuE',
      //         rule: 'python:S117',
      //         severity: 'MINOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/main.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 80,
      //         hash: '7ac64b9d63210b5525a9b326789680bf',
      //         textRange: {
      //           startLine: 80,
      //           endLine: 80,
      //           startOffset: 8,
      //           endOffset: 16,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Rename this local variable "dataFile" to match the regular expression ^[_a-z][a-z0-9_]*$.',
      //         effort: '2min',
      //         debt: '2min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEpTPn0W90a48GuF',
      //         rule: 'python:S117',
      //         severity: 'MINOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/main.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 115,
      //         hash: 'f65fb054ffd830f48d5caaeb47ed37ea',
      //         textRange: {
      //           startLine: 115,
      //           endLine: 115,
      //           startOffset: 16,
      //           endOffset: 22,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Rename this local variable "curRow" to match the regular expression ^[_a-z][a-z0-9_]*$.',
      //         effort: '2min',
      //         debt: '2min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEpTPn0W90a48GuG',
      //         rule: 'python:S117',
      //         severity: 'MINOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/main.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 123,
      //         hash: '4b24f5ac957ad3444e10fa0e8adfaace',
      //         textRange: {
      //           startLine: 123,
      //           endLine: 123,
      //           startOffset: 20,
      //           endOffset: 25,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Rename this local variable "typeR" to match the regular expression ^[_a-z][a-z0-9_]*$.',
      //         effort: '2min',
      //         debt: '2min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEpTPn0W90a48GuH',
      //         rule: 'python:S117',
      //         severity: 'MINOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/main.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 127,
      //         hash: 'b2d52e188aa0132cdddfacf224587ddb',
      //         textRange: {
      //           startLine: 127,
      //           endLine: 127,
      //           startOffset: 8,
      //           endOffset: 14,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Rename this local variable "msgBox" to match the regular expression ^[_a-z][a-z0-9_]*$.',
      //         effort: '2min',
      //         debt: '2min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEpTPn0W90a48GuI',
      //         rule: 'python:S117',
      //         severity: 'MINOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/main.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 133,
      //         hash: '4832ce9ec60f9929b45308ca2eef3295',
      //         textRange: {
      //           startLine: 133,
      //           endLine: 133,
      //           startOffset: 8,
      //           endOffset: 19,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Rename this local variable "fileChooser" to match the regular expression ^[_a-z][a-z0-9_]*$.',
      //         effort: '2min',
      //         debt: '2min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //       {
      //         key: 'AYc8aEpTPn0W90a48GuJ',
      //         rule: 'python:S117',
      //         severity: 'MINOR',
      //         component:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/main.py',
      //         project:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         line: 140,
      //         hash: '4832ce9ec60f9929b45308ca2eef3295',
      //         textRange: {
      //           startLine: 140,
      //           endLine: 140,
      //           startOffset: 8,
      //           endOffset: 19,
      //         },
      //         status: 'OPEN',
      //         message:
      //           'Rename this local variable "fileChooser" to match the regular expression ^[_a-z][a-z0-9_]*$.',
      //         effort: '2min',
      //         debt: '2min',
      //         creationDate: '2023-04-01T10:41:10+0000',
      //         updateDate: '2023-04-01T10:41:10+0000',
      //         type: 'CODE_SMELL',
      //         scope: 'MAIN',
      //       },
      //     ],
      //     components: [
      //       {
      //         key: '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/main.py',
      //         enabled: true,
      //         qualifier: 'FIL',
      //         name: 'main.py',
      //         longName: 'Source/main.py',
      //         path: 'Source/main.py',
      //       },
      //       {
      //         key: '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732:Source/crawlData.py',
      //         enabled: true,
      //         qualifier: 'FIL',
      //         name: 'crawlData.py',
      //         longName: 'Source/crawlData.py',
      //         path: 'Source/crawlData.py',
      //       },
      //       {
      //         key: '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         enabled: true,
      //         qualifier: 'TRK',
      //         name: '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //         longName:
      //           '01f5d8de-a0c8-4b19-aa10-9e15f9a9a29c_0293aa94-3e86-4312-b19c-a618131b4fd8_1680345661732',
      //       },
      //     ],
      //   },
      // };
      return response;
    },

    async getIssuesWithSource(componentIssue: string) {
      const response = await axios
        .get(
          `http://localhost:5000/api/sonarqube/source/${encodeURIComponent(
            componentIssue
          )}`
        )
        .then((res) => {
          return res.data;
        });

      return response;
      return {
        error: 0,
        sources: [
          {
            line: 1,
            code: '<span class="k">import</span> <span class="sym-1 sym">requests</span>',
          },
          {
            line: 2,
            code: '',
          },
          {
            line: 3,
            code: '<span class="k">def</span> <span class="sym-2 sym">getContentPage</span>(<span class="sym-3 sym">url</span>:str):',
          },
          {
            line: 4,
            code: '    <span class="sym-4 sym">req</span>=<span class="sym-1 sym">requests</span>.get(url=<span class="sym-3 sym">url</span>)',
          },
          {
            line: 5,
            code: '    <span class="k">return</span> <span class="sym-4 sym">req</span>',
          },
          {
            line: 6,
            code: '',
          },
          {
            line: 7,
            code: '<span class="k">def</span> <span class="sym-5 sym">getReaction</span>(<span class="sym-6 sym">content</span>:str):',
          },
          {
            line: 8,
            code: '    <span class="sym-7 sym">edge_pos</span>=<span class="sym-6 sym">content</span>.find(<span class="s">"top_reactions:{edges"</span>)',
          },
          {
            line: 9,
            code: '    <span class="sym-8 sym">res</span>=[]',
          },
          {
            line: 10,
            code: '    <span class="k">if</span> (<span class="sym-7 sym">edge_pos</span>&lt;<span class="c">0</span>):',
          },
          {
            line: 11,
            code: '        <span class="k">return</span> -<span class="c">1</span>',
          },
          {
            line: 12,
            code: '    <span class="k">if</span>(<span class="sym-7 sym">edge_pos</span>&gt;=<span class="c">0</span>):',
          },
          {
            line: 13,
            code: '        <span class="sym-9 sym">main_content</span>=<span class="sym-6 sym">content</span>[<span class="sym-7 sym">edge_pos</span>:]',
          },
          {
            line: 14,
            code: '        <span class="sym-10 sym">reacts</span>=<span class="sym-9 sym">main_content</span>.split(<span class="s">"},"</span>)',
          },
          {
            line: 15,
            code: '        <span class="sym-11 sym">index</span>=<span class="c">0</span>',
          },
          {
            line: 16,
            code: '        <span class="k">while</span> (<span class="sym-10 sym">reacts</span>[<span class="sym-11 sym">index</span>].find(<span class="s">"reaction_count:"</span>)&gt;=<span class="c">0</span> ):',
          },
          {
            line: 17,
            code: '            <span class="sym-12 sym">elements</span>=<span class="sym-10 sym">reacts</span>[<span class="sym-11 sym">index</span>].split(<span class="s">","</span>)',
          },
          {
            line: 18,
            code: '            <span class="sym-13 sym">num</span>=<span class="sym-12 sym">elements</span>[<span class="c">0</span>].find(<span class="s">"reaction_count:"</span>)',
          },
          {
            line: 19,
            code: '            <span class="sym-13 sym">num</span>=<span class="sym-12 sym">elements</span>[<span class="c">0</span>][(<span class="sym-13 sym">num</span>+len(<span class="s">"reaction_count:"</span>)):]',
          },
          {
            line: 20,
            code: '            <span class="sym-14 sym">type</span>=<span class="sym-12 sym">elements</span>[-<span class="c">1</span>].find(<span class="s">"reaction_type:"</span>)',
          },
          {
            line: 21,
            code: '            <span class="k">if</span> <span class="sym-14 sym">type</span>&lt;<span class="c">0</span>:',
          },
          {
            line: 22,
            code: '                <span class="sym-11 sym">index</span>+=<span class="c">1</span>',
          },
          {
            line: 23,
            code: '                <span class="k">continue</span>',
          },
          {
            line: 24,
            code: '            <span class="sym-14 sym">type</span>=<span class="sym-12 sym">elements</span>[-<span class="c">1</span>][(<span class="sym-14 sym">type</span>+len(<span class="s">"reaction_type:"</span>)):]',
          },
          {
            line: 25,
            code: '            <span class="sym-14 sym">type</span>=<span class="sym-14 sym">type</span>.rstrip(<span class="s">\'"\'</span>).lstrip(<span class="s">\'"\'</span>)',
          },
          {
            line: 26,
            code: '',
          },
          {
            line: 27,
            code: '            <span class="sym-8 sym">res</span>.append((<span class="sym-13 sym">num</span>,<span class="sym-14 sym">type</span>))',
          },
          {
            line: 28,
            code: '            <span class="sym-11 sym">index</span>+=<span class="c">1</span>',
          },
          {
            line: 29,
            code: '        <span class="s">"hello"</span>.split()',
          },
          {
            line: 30,
            code: '        <span class="k">return</span> <span class="sym-8 sym">res</span>',
          },
        ],
      };
    },

    async getOverViewSubmission(submissionId: string) {
      const response = await fetch(`/api/result/${submissionId}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));

      return {
        error: 0,
        data: {
          paging: {
            pageIndex: 1,
            pageSize: 5,
            total: 1,
          },
          measures: [
            {
              metric: 'bugs',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '1',
                },
              ],
            },
            {
              metric: 'code_smells',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '11',
                },
              ],
            },
            {
              metric: 'coverage',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '0.0',
                },
              ],
            },
            {
              metric: 'duplicated_lines_density',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '0.0',
                },
              ],
            },
            {
              metric: 'ncloc',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '156',
                },
              ],
            },
            {
              metric: 'reliability_rating',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '3.0',
                },
              ],
            },
            {
              metric: 'security_rating',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '1.0',
                },
              ],
            },
            {
              metric: 'sqale_index',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '43',
                },
              ],
            },
            {
              metric: 'sqale_rating',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '1.0',
                },
              ],
            },
            {
              metric: 'vulnerabilities',
              history: [
                {
                  date: '2023-04-30T08:55:45+0700',
                  value: '0',
                },
              ],
            },
          ],
        },
      };
    },
  };
}
