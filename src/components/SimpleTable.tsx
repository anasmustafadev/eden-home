"use client"
import React from 'react'

function SimpleTable({ data }: any) {
    return (
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      {data[0].map((element: string) => {
                        return (
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          >
                            {element}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((element: any, index: any) => {
                      if (index != 0) {
                        return (
                          <tr>
                            {element.map((i: any) => {
                              return (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {i}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SimpleTable;