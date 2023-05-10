import axios from 'axios';

import { fetch, getWithPath } from '../api.http';

import { SubmissionResponse } from '~/domain/sonarqube';

const API_SONARQUBE_DOMAIN = 'http://localhost:5000/api/sonarqube';
export function useSonarqube() {
  return {
    async getIssuesSubmission(
      submissionId: string,
      params?: Record<string, unknown>
    ): Promise<SubmissionResponse> {
      const response = await axios
        .get(`${API_SONARQUBE_DOMAIN}/issue/${submissionId}`, {
          params,
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMWE1MTQyNjEtNDNkNC00NTg2LThiMjEtZGVmM2Y3N2RiOGU2IiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0wNlQwOTo0NDozNC4yNThaIiwidXBkYXRlZEF0IjoiMjAyMy0wNS0wNlQwOTo0NDozNC4yNThaIiwiZGVsZXRlZEF0IjpudWxsLCJuYW1lIjoiTmdoxKlhIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6Im5naGlhQGdtYWlsLmNvbSIsInVzZXJJZCI6IjAzIiwibW9vZGxlSWQiOiIwMyIsInN0YXR1cyI6MX0sImlhdCI6MTY4MzY0NzQ1MSwiZXhwIjoxNjgzNzMzODUxfQ.4FclCESa_ndtDHBIKXXhe5P028X-GaR4-ZTqiAbuQU0',
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch(() => {
          console.log(123);
        });
      return response;
    },

    async getIssuesWithSource(componentIssue: string) {
      const response = await axios
        .get(
          `http://localhost:5000/api/sonarqube/source/${encodeURIComponent(
            componentIssue
          )}`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMWE1MTQyNjEtNDNkNC00NTg2LThiMjEtZGVmM2Y3N2RiOGU2IiwiY3JlYXRlZEF0IjoiMjAyMy0wNS0wNlQwOTo0NDozNC4yNThaIiwidXBkYXRlZEF0IjoiMjAyMy0wNS0wNlQwOTo0NDozNC4yNThaIiwiZGVsZXRlZEF0IjpudWxsLCJuYW1lIjoiTmdoxKlhIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6Im5naGlhQGdtYWlsLmNvbSIsInVzZXJJZCI6IjAzIiwibW9vZGxlSWQiOiIwMyIsInN0YXR1cyI6MX0sImlhdCI6MTY4MzY0NzQ1MSwiZXhwIjoxNjgzNzMzODUxfQ.4FclCESa_ndtDHBIKXXhe5P028X-GaR4-ZTqiAbuQU0',
            },
          }
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
