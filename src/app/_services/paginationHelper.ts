import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

export function getPaginationHeaders(pageNumber: number, pageSize: number) {
   let params = new HttpParams();

   params = params.append('pageNumber', pageNumber);
   params = params.append('pageSize', pageSize);

   return params;
}

export function getPaginatedResult<T>(
   url: string,
   params: HttpParams,
   http: HttpClient
) {
   const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

   return http.get<T>(url, { observe: 'response', params }).pipe(
      map((res) => {
         if (res.body) {
            paginatedResult.result = res.body;
         }

         const pagination = res.headers.get('Pagination');

         if (pagination) {
            paginatedResult.pagination = JSON.parse(pagination);
         }

         return paginatedResult;
      })
   );
}