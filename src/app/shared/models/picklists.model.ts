import { Lookup } from "../entities"
import * as _ from "lodash"

// Picklists
// ===========================================
// lookupById
// lookupByKey
// listById
// listByKey
// listsByKey
// listBySpec
// listsBySpec
// selectionBySpec
// lookupsBySpec
// categoryById
// idByKey
// options
//
// list = key{.subkey}{|option}
// spec = (list|number){,(list|number)}*
//
// Role || Role|Admin
// Units || Units:Mass || Units:Mass.kg
// 123
// Role,123,Units:Mass

export class Picklists {
  lookups: Lookup[]                                   // list of raw database records
  lists: Lookup[]                                     // list of picklist definitions
  name: { [id: number]: string } = {}                 // id > name dictionary

  // id to lookup
  // id to key
  // id to path
  // path to id
  keyToId: { [key: string | number]: number | undefined }
  // get picklist by key
  keyToList: { [key: string]: Lookup }
  // get lookup by id
  idToLookup: { [id: number]: Lookup }
  // get picklist by option id
  idToList: { [id: number]: Lookup }


  constructor(lookups: Lookup[]) {
    this.lookups = lookups.map(lookup => new Lookup(lookup))
    this.lookups.forEach((lu) => (this.name[lu.id] = lu.name))
    this.lists = this.lookups.filter(lookup => lookup.parentId == 0)
    this.lists.forEach(list => {
      list.allOptions = this.lookups.filter(lookup => lookup.parentId == list.id)
      list.options = list.allOptions.filter(option => option.isEnabled)
    })

    // new, quicker lookup tables

    // id to lookup
    this.idToLookup = {}
    this.lookups.forEach(lu => this.idToLookup[lu.id] = lu)

    // lids and picklists
    this.keyToId = {}
    this.keyToList = {}
    this.idToList = {}
    const lists = this.lookups.filter(lu => !lu.parentId)
    lists.forEach((pl) => {
        this.keyToId[pl.key] = pl.id
        this.keyToList[pl.key] = pl
        pl.options = this.lookups.filter(lu => lu.parentId === pl.id)
        pl.options.forEach(o => (this.keyToId[`${pl.key}.${o.key}`] = o.id))
        pl.options.forEach(o => (this.idToList[o.id] = pl))
      })
  }

  // return the lookup by id, undefined otherwise
  private lookupById(id: number): Lookup {
    return this.lookups.find(lookup => lookup.id === id)
  }

  // return first lookup by key, undefined otherwise
  private lookupByKey(key: string): Lookup {
    const parts = key.split(".")
    if (parts.length == 1)
      return this.lookups.find(lookup => lookup.key === key)
    const list = this.lists.find(list => list.key == parts[0])
    return list?.options.find(option => option.key == parts[1])
  }

  // return the list by id, or the list containing the id
  listById(id: number): Lookup {
    let lookup = this.lookups.find(lookup => lookup.id === id)
    if (lookup?.parentId)
      lookup = this.lookupById(lookup.parentId)
    return this.lists.find(list => list.id === lookup?.id)
  }

  // return the list by key or the list containing the option by key
  listByKey(key: string): Lookup {
    const listKey = this.prep(key.split(".")[0]) // ignore option
    return this.lists.find(list => list.key === listKey)
  }

  // return the list by key or the list containing the option by key
  // returns: [ list, ... ]
  listsByKey(key: string): Lookup[] {
    const listKey = this.prep(key.split(".")[0]) // ignore option
    const list = this.lists.find(list => list.key === listKey)
    const lists = this.lists.filter(list => list.key.startsWith(listKey + ":"))
    return list ? [list] : lists
  }

  // returns picklists based on a list-spec
  // returns: [ list, ... ]
  listsBySpec(spec: string): Lookup[] {
    const sets: Lookup[] = []
    spec.toString().split(",").forEach(part => {
      if (isNaN(+part))
        sets.push(...this.listsByKey(part))
      else
        sets.push(this.listById(+part))
    })
    return [...new Set(sets)]
  }

  // return a single picklist from a spec
  listBySpec(spec: string): Lookup {
    const lists = this.listsBySpec(spec)
    return lists.length == 1 ? lists[0] : null
  }

  // Return the first option in a spec
  selectionBySpec(spec: string): Lookup {
    let selection: Lookup = null
    spec.toString().split(",").forEach(desc => {
      if (isNaN(+desc)) {
        const parts = desc.split(".")
        if (parts.length == 2) {
          const list = this.listByKey(parts[0])
          selection ??= list?.options.find(opt => opt.key == parts[1])
        }
      } else {
        const lookup = this.lookupById(+desc)
        if (lookup?.parentId != 0) selection ??= lookup
      }
    })
    return selection
  }

  // Enumerate all options in a spec
  lookupsBySpec(spec: string): Lookup[] {
    const lookups: Lookup[] = []
    spec.toString().split(",").forEach(desc => {
      if (isNaN(+desc)) {
        const parts = desc.split(".")
        const lists = this.listsByKey(this.prep(parts[0]))
        if (parts.length == 1) {
          lists.forEach(list => lookups.push(...list.options))
        } else if (parts.length == 2 && lists.length == 1) {
          lookups.push(...lists[0].options.filter(opt => opt.key == parts[1]))
        }
      } else {
        const lookup = this.lookupById(+desc)
        if (lookup?.parentId == 0)
          lookups.push(...lookup.options)
        else
          lookups.push(lookup)
      }
    })
    return [...new Set(lookups)]
  }

  categoryById(id: number) {
    try {
      let lookup = this.lookupById(id)
      lookup = this.lookupById(lookup.parentId)
      return lookup.key.split(":")[1]
    } catch {
      return null
    }
  }

  // return the id of the key path
  idByKey(path: string): number {
    return this.lookupByKey(path)?.id ?? 0
  }

  options(key: string | number) {
    const lookup = this.lists.find(list => list.key == key || list.id == key)
    return lookup?.options ?? []
  }

  private prep(name: string) {
    if (name.endsWith("Type")) {
      name = name.slice(0, -4)
    }
    return name.split(":").map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(":")
  }

  get canLabel(): Lookup[] {
    return this.lists.filter(list => list.isItem && list.isEnabled)
  }
}
