import { DashboardVisibility } from 'shared'
import { Column } from './column'

export class Dashboard {
  private _id: string
  private _title: string
  private _description: string
  private _imageCoverUrl: string
  private _createdAt: string
  private _status: DashboardVisibility
  private _column: Column[]

  constructor(
    id: string,
    title: string,
    description: string,
    imageCoverUrl: string,
    createdAt: string,
    status: DashboardVisibility,
    column: Column[]
  ) {
    this._id = id
    this._title = title
    this._description = description
    this._imageCoverUrl = imageCoverUrl
    this._createdAt = createdAt
    this._status = status
    this._column = column
  }

  public get id() {
    return this._id
  }

  public get title() {
    return this._title
  }

  public get description() {
    return this._description
  }

  public get imageCoverUrl() {
    return this._imageCoverUrl
  }

  public get createdAt() {
    return this._createdAt
  }

  public get status() {
    return this._status
  }

  public get column() {
    return this._status
  }
}
