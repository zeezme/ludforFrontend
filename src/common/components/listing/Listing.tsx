import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"
import { v4 } from "uuid"
import DropdownButton from "../buttons/dropdownButton/DropDownButton"
import api from "../../helpers/api"
import { createRef, RefObject, useEffect, useMemo, useState } from "react"

export interface IListingProps {
  apiEndPoint: string
  title?: string
  fields: Record<string, string>
}

const resolvePath = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj)
}

const Listing: React.FC<IListingProps> = ({ title, apiEndPoint, fields }) => {
  const [itens, setItens] = useState<any[]>([])
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  })

  const rowRefs: RefObject<HTMLDivElement>[] = useMemo(
    () =>
      Array(itens.length)
        .fill(null)
        .map(() => createRef<HTMLDivElement>()),
    [itens]
  )

  const actionsItems = [
    {
      text: "Adicionar",
      onClick: () => {
        console.log("Adicionar")
      },
    },
  ]

  const handlePageChange = async (page: number) => {
    await handleLoadItems(page)
  }

  const handleLoadItems = async (page: number = 1) => {
    const apiResponse = await api({
      endpoint: `${apiEndPoint}`,
      method: "GET",
      params: {
        page,
        pageSize: meta.pageSize,
      },
      useAuthToken: true,
    })

    if (apiResponse && apiResponse.data) {
      setItens(apiResponse.data.data)
      setMeta(apiResponse.data.meta)
    }
  }

  const startIndex = (meta.page - 1) * meta.pageSize + 1
  const endIndex = Math.min(meta.page * meta.pageSize, meta.total)

  useEffect(() => {
    let isMounted = true

    const loadInitialData = async () => {
      if (isMounted) {
        await handleLoadItems()
      }
    }

    loadInitialData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center">
          <span className="m-0 h4 text-center">{title}</span>
          <DropdownButton items={actionsItems} title="Ações" />
        </CardHeader>
        <CardBody className="p-0">
          <div className="h5 bg-primary-subtle text-dark d-flex flex-row ps-1 pe-1 py-2 m-0">
            {Object.entries(fields).map(([_, title]) => (
              <Col key={v4()}>{title}</Col>
            ))}
          </div>
          {itens.map((item, index) => (
            <div
              key={v4()}
              className={`${index % 2 === 0 ? "bg-light" : ""} d-flex flex-row ps-1 pe-1 py-2`}
              ref={rowRefs[index]}
              onMouseEnter={() => {
                rowRefs[index]?.current?.classList.add("bg-primary-subtle")
                rowRefs[index]?.current?.classList.add("cursor-pointer")
              }}
              onMouseLeave={() => {
                rowRefs[index]?.current?.classList.remove("bg-primary-subtle")
                rowRefs[index]?.current?.classList.remove("cursor-pointer")
              }}
            >
              {Object.keys(fields).map((path) => (
                <Col key={v4()}>{String(resolvePath(item, path) || "-")}</Col>
              ))}
            </div>
          ))}
        </CardBody>
        <CardFooter className="d-flex justify-content-center align-items-center">
          <Pagination style={{ marginBottom: "0" }}>
            <PaginationItem disabled={meta.page === 1}>
              <PaginationLink
                first
                href="#"
                onClick={() => handlePageChange(1)}
              />
            </PaginationItem>
            <PaginationItem disabled={meta.page === 1}>
              <PaginationLink
                previous
                href="#"
                onClick={() => handlePageChange(meta.page - 1)}
              />
            </PaginationItem>
            {Array.from(
              { length: meta.totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <PaginationItem key={v4()} active={page === meta.page}>
                <PaginationLink href="#" onClick={() => handlePageChange(page)}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={meta.page === meta.totalPages}>
              <PaginationLink
                next
                href="#"
                onClick={() => handlePageChange(meta.page + 1)}
              />
            </PaginationItem>
            <PaginationItem disabled={meta.page === meta.totalPages}>
              <PaginationLink
                last
                href="#"
                onClick={() => handlePageChange(meta.totalPages)}
              />
            </PaginationItem>
          </Pagination>
          <div className="text-center text-muted ms-3">
            <span>
              {startIndex === endIndex
                ? `Mostrando ${startIndex} de ${meta.total} itens.`
                : `Mostrando de ${startIndex} a ${endIndex} de ${meta.total} itens.`}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Listing

